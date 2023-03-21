"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var useDebouce_1 = require("../../hooks/useDebouce");
var Chip_1 = require("../Chip/Chip");
var ExpandMoreOutlined_1 = require("@mui/icons-material/ExpandMoreOutlined");
var Styled = require("./styles");
var useOutsideClickAlerter_1 = require("../../hooks/useOutsideClickAlerter");
var DropdownList_1 = require("./DropdownList/DropdownList");
var global_1 = require("../../styles/global");
function Dropdown(_a) {
    var _this = this;
    var controls = _a.controls, _b = _a.isSingleSelectable, isSingleSelectable = _b === void 0 ? false : _b, selectedItems = _a.selectedItems, setSelectedItems = _a.setSelectedItems, label = _a.label, placeholder = _a.placeholder, id = _a.id, getItems = _a.getItems, _c = _a.enableSearch, enableSearch = _c === void 0 ? true : _c, _d = _a.maxAmountOfItems, maxAmountOfItems = _d === void 0 ? 20 : _d;
    var wrapperRef = react_1.createRef();
    var dropdownRef = react_1.createRef();
    var _e = react_1.useState(selectedItems), items = _e[0], setItems = _e[1];
    var _f = react_1.useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var debouncedSearchTerm = useDebouce_1["default"](searchTerm, 200);
    var _g = react_1.useState([]), matchingItems = _g[0], setMatchingItems = _g[1];
    var _h = react_1.useState(false), doShowResultsList = _h[0], setDoShowResultsList = _h[1];
    var _j = react_1.useState(-1), suggestionIndex = _j[0], setSuggestionIndex = _j[1];
    useOutsideClickAlerter_1["default"](wrapperRef, function () { return setDoShowResultsList(false); });
    react_1.useEffect(function () {
        var onSearchTermChange = function (searchTerm) { return __awaiter(_this, void 0, void 0, function () {
            var matchingItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getItems(searchTerm)];
                    case 1:
                        matchingItems = _a.sent();
                        setMatchingItems(matchingItems);
                        if (searchTerm.length > 1) {
                            setDoShowResultsList(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        onSearchTermChange(debouncedSearchTerm);
    }, [debouncedSearchTerm, getItems]);
    react_1.useEffect(function () {
        setSelectedItems(items);
    }, [items, setSelectedItems]);
    var setSingleItem = function (item) {
        for (var _i = 0, matchingItems_1 = matchingItems; _i < matchingItems_1.length; _i++) {
            var i = matchingItems_1[_i];
            if (i.id !== item.id) {
                deselectItem(i);
            }
        }
        selectItem(item);
    };
    var toggleItem = function (item) {
        var isSelected = selectedItems.some(function (selectedItem) { return selectedItem.id === item.id; });
        if (isSingleSelectable) {
            setSingleItem(item);
        }
        else if (isSelected) {
            deselectItem(item);
        }
        else {
            selectItem(item);
        }
    };
    var handleOnChange = function (event) {
        setSuggestionIndex(-1);
        setSearchTerm(event.currentTarget.value);
    };
    var selectItem = function (selectedItem) {
        setItems(function (previousState) { return __spreadArrays(new Set(__spreadArrays(previousState, [selectedItem]))); });
    };
    var deselectItem = function (selectedItem) {
        return setItems(function (previousState) {
            return previousState.filter(function (item) { return item.id !== selectedItem.id; });
        });
    };
    var resultsToShow = Math.min(matchingItems.length, maxAmountOfItems);
    var handleKeyDown = function (e) {
        if (e.key === 'Escape' || e.key === 'Esc' || e.key === 'Tab') {
            setDoShowResultsList(false);
            setSuggestionIndex(-1);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            var item = matchingItems[suggestionIndex];
            if (item) {
                toggleItem(item);
            }
        }
        if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault();
            setDoShowResultsList(true);
            if (suggestionIndex === -1) {
                setSuggestionIndex(0);
                return;
            }
            var isGreaterThanResultsListLength = suggestionIndex < resultsToShow - 1;
            setSuggestionIndex(isGreaterThanResultsListLength ? suggestionIndex + 1 : 0);
        }
        if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            setDoShowResultsList(true);
            if (suggestionIndex === -1) {
                setSuggestionIndex(0);
                return;
            }
            var isLessThanResultsListLength = suggestionIndex <= 0;
            setSuggestionIndex(isLessThanResultsListLength ? resultsToShow - 1 : suggestionIndex - 1);
        }
    };
    return (react_1["default"].createElement(Styled.Wrapper, null,
        react_1["default"].createElement(Styled.DropdownWrapper, { ref: wrapperRef },
            react_1["default"].createElement(Styled.Label, null, label),
            react_1["default"].createElement(Styled.InputWrapper, null,
                react_1["default"].createElement(Styled.DropdownInput, { "aria-label": "Change " + label + " " + (isSingleSelectable ? 'option' : 'options'), placeholder: placeholder, onChange: handleOnChange, onKeyDown: handleKeyDown, value: enableSearch ? undefined : placeholder, onClick: function () {
                        setDoShowResultsList(!doShowResultsList);
                    }, "aria-controls": id + " " + (controls || ''), "aria-describedby": id + "-help", searchIsEnabled: enableSearch, role: 'combobox', "aria-autocomplete": 'list', "aria-haspopup": 'listbox', "aria-expanded": doShowResultsList, "aria-activedescendant": suggestionIndex === -1
                        ? undefined
                        : id + "-option-" + suggestionIndex }),
                react_1["default"].createElement(Styled.IconButton, { onClick: function () {
                        setDoShowResultsList(!doShowResultsList);
                    }, "aria-hidden": true, isPointingDown: doShowResultsList },
                    react_1["default"].createElement(ExpandMoreOutlined_1["default"], { style: { height: '2rem', width: '2rem' } }))),
            react_1["default"].createElement(global_1.VisuallyHidden, { id: id + "-help" }, "Options are shown below"),
            doShowResultsList && (react_1["default"].createElement(DropdownList_1["default"], { id: id, ref: dropdownRef, isSingleSelectable: isSingleSelectable, selectedIndex: suggestionIndex, selectedItems: selectedItems, items: matchingItems, toggleItem: isSingleSelectable ? setSingleItem : toggleItem }))),
        !isSingleSelectable && (react_1["default"].createElement(Styled.SelectedItemsWrapper, null, selectedItems.map(function (selectedItem, index) { return (react_1["default"].createElement(Styled.SelectedItem, { key: index },
            react_1["default"].createElement(Chip_1["default"], { label: selectedItem.label, id: selectedItem.id.toString(), onDelete: function () { return deselectItem(selectedItem); }, type: 'filter' }))); })))));
}
exports["default"] = Dropdown;
