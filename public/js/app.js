(function() {
    'use strict';

    var PaletteConst = [
        {
            "name": "Flat UI",
            "colors": [
                {"name": "turquoise", "hex": "#1abc9c"},
                {"name": "green sea", "hex": "#16a085"},
                {"name": "emerald", "hex": "#2ecc71"},
                {"name": "nephritis", "hex": "#27ae60"},
                {"name": "peter river", "hex": "#3498db"},
                {"name": "belize hole", "hex": "#2980b9"},
                {"name": "amethyst", "hex": "#9b59b6"},
                {"name": "wisteria", "hex": "#8e44ad"},
                {"name": "wet asphalt", "hex": "#34495e"},
                {"name": "midnight blue", "hex": "#2c3e50"},
                {"name": "sunflower", "hex": "#f1c40f"},
                {"name": "orange", "hex": "#f39c12"},
                {"name": "carrot", "hex": "#e67e22"},
                {"name": "pumpkin", "hex": "#d35400"},
                {"name": "alizarin", "hex": "#e74c3c"},
                {"name": "pomegranate", "hex": "#c0392b"},
                {"name": "clouds", "hex": "#ecf0f1"},
                {"name": "silver", "hex": "#bdc3c7"},
                {"name": "concrete", "hex": "#95a5a6"},
                {"name": "asbestos", "hex": "#7f8c8d"}
            ]
        },
        {
            "name": "Material",
            "colors": [
                {"name": "Red", "hex": "#F44336"},
                {"name": "Pink", "hex": "#E91E63"},
                {"name": "Purple", "hex": "#9C27B0"},
                {"name": "Deep Purple", "hex": "#673AB7"},
                {"name": "Indigo", "hex": "#3F51B5"},
                {"name": "Blue", "hex": "#2196F3"},
                {"name": "Light Blue", "hex": "#03A9F4"},
                {"name": "Cyan", "hex": "#00BCD4"},
                {"name": "Green", "hex": "#4CAF50"},
                {"name": "Light Green", "hex": "#8BC34A"},
                {"name": "Lime", "hex": "#CDDC39"},
                {"name": "Yellow", "hex": "#FFEB3B"},
                {"name": "Amber", "hex": "#FFC107"},
                {"name": "Orange", "hex": "#FF9800"},
                {"name": "Deep Orange", "hex": "#FF5722"},
                {"name": "Brown", "hex": "#795548"},
                {"name": "Grey", "hex": "#9E9E9E"},
                {"name": "Blue Grey", "hex": "#607D8B"},
                {"name": "Black", "hex": "#000000"},
                {"name": "White", "hex": "#FFFFFF"}
            ]
        },
        {
            "name": "Slack",
            "colors": [
                {"name": "Green", "hex": "#3EB890"},
                {"name": "Blue", "hex": "#70CADB"},
                {"name": "Gold", "hex": "#E8A723"},
                {"name": "Rose", "hex": "#E01765"},
                {"name": "Dark Purple", "hex": "#443642"}
            ]
        }
    ],
        pageCornerCmpnt = {
            bindings: {
                background: '<?',
                corner: '<?'
            },
            controller: pageCornerCtrl,
            templateUrl: 'partials/page-corner.html'
        },
        colorChipCmpnt = {
            bindings: {
                color: '<',
                onColorSelect: '&'
            },
            controller: colorChipCtrl ,
            templateUrl: 'partials/color-chip.html'
        },
        paletteCmpnt = {
            bindings: {
                palette: '<',
                onColorSelect: '&'
            },
            controller: paletteCtrl,
            templateUrl: 'partials/palette.html'
        };

    angular
        .module('jm.colorPalettes', [])
        .constant('Palettes', PaletteConst)
        .component('pageCorner', pageCornerCmpnt)
        .component('colorChip', colorChipCmpnt)
        .component('palette', paletteCmpnt)
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['Palettes'];

    function mainCtrl(Palettes) {
        var vm = this;

        function setBackground(hex) {
            window.console.log('setting background', hex);
            vm.background = hex;
        }

        vm.Palettes = Palettes;
        vm.background = '#ecf0f1';
        vm.setBackground = setBackground;
    }

    function pageCornerCtrl() {
        var vm = this;
        vm.repoUrl = 'https://github.com/theaccordance/color-palettes';

        function getLuma(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
                r = parseInt(result[1], 16),
                g = parseInt(result[2], 16),
                b = parseInt(result[3], 16);
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        function onInit() {
            if (!vm.background) {
                window.console.log('No Background provided, setting to default...');
                vm.background = '#ffffff';
            }
            if (!vm.corner) {
                window.console.log('No Corner color provided, setting to default...');
                vm.corner = (getLuma(vm.background) < 75) ? '#FFF' : '#000';
            }
            vm.fill = vm.corner;
        }

        function onChanges(changeObj) {
            if (vm.corner !== vm.fill) {
                vm.fill = vm.corner;
            }

            if (changeObj.background) {
                if (changeObj.background.currentValue === vm.corner) {
                    vm.fill = (getLuma(vm.background) < 75) ? '#FFF' : '#000';
                }
            }
        }

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
    }





})();