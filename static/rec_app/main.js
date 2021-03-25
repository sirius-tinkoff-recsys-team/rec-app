var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemWrap = function (_React$Component) {
    _inherits(ItemWrap, _React$Component);

    function ItemWrap(props) {
        _classCallCheck(this, ItemWrap);

        var _this = _possibleConstructorReturn(this, (ItemWrap.__proto__ || Object.getPrototypeOf(ItemWrap)).call(this, props));

        _this.state = { items: _this.props.items };
        _this.change_state = _this.change_state.bind(_this);
        return _this;
    }

    _createClass(ItemWrap, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log(this.state);
        }
    }, {
        key: "change_state",
        value: function change_state(i) {
            var items = this.state.items.slice();
            items[i]["selected"] = 1 - items[i]["selected"];
            var formData = new FormData();
            formData.append("csrfmiddlewaretoken", token);
            formData.append("add", items[i]["selected"]);
            formData.append("place_id", items[i]["place_id"]);
            fetch("", { method: "POST", body: formData }).then(function (response) {
                return response.json();
            }).then(function (resp) {
                return console.log(resp);
            });

            this.setState({ items: items });
            console.log("change-state", this.state.items);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    "Choose places you have visited recently"
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-lg btn-primary",
                        onClick: function onClick() {
                            return window.location.href = "/rec";
                        } },
                    "Recommend places"
                ),
                React.createElement(
                    "div",
                    { className: "row d-flex" },
                    this.state.items.map(function (item, index) {
                        return React.createElement(Item, { change_state: _this2.change_state, item: item, index: index,
                            key: index });
                    })
                )
            );
        }
    }]);

    return ItemWrap;
}(React.Component);

var RecWrap = function (_React$Component2) {
    _inherits(RecWrap, _React$Component2);

    function RecWrap(props) {
        _classCallCheck(this, RecWrap);

        var _this3 = _possibleConstructorReturn(this, (RecWrap.__proto__ || Object.getPrototypeOf(RecWrap)).call(this, props));

        _this3.change_state = _this3.change_state.bind(_this3);
        return _this3;
    }

    _createClass(RecWrap, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log(this.state);
        }
    }, {
        key: "change_state",
        value: function change_state(i) {
            console.log("change-state");
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    "These places are very near"
                ),
                React.createElement(
                    "div",
                    { className: "row d-flex" },
                    this.props.items.map(function (item, index) {
                        return React.createElement(Item, { change_state: _this4.change_state, item: item, index: index,
                            key: index });
                    })
                ),
                React.createElement(
                    "h2",
                    null,
                    "Your friends visit these places"
                ),
                React.createElement(
                    "div",
                    { className: "row d-flex" },
                    this.props.itemsf.map(function (item, index) {
                        return React.createElement(Item, { change_state: _this4.change_state, item: item, index: index,
                            key: index });
                    })
                ),
                React.createElement(
                    "h2",
                    null,
                    "You frequently go here"
                ),
                React.createElement(
                    "div",
                    { className: "row d-flex" },
                    this.props.myitems.map(function (item, index) {
                        return React.createElement(Item, { change_state: _this4.change_state, item: item, index: index,
                            key: index });
                    })
                )
            );
        }
    }]);

    return RecWrap;
}(React.Component);

var Item = function (_React$Component3) {
    _inherits(Item, _React$Component3);

    function Item(props) {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
    }

    _createClass(Item, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log(this.props);
        }
    }, {
        key: "get_class",
        value: function get_class() {
            var c = "item";
            if (this.props.item.selected) {
                c += " item-select";
            }
            return c;
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                { className: "col-md-3" },
                React.createElement(
                    "div",
                    { className: this.get_class(), onClick: function onClick() {
                            return _this6.props.change_state(_this6.props.index);
                        } },
                    React.createElement(
                        "h2",
                        null,
                        " ",
                        this.props.item.name,
                        " ",
                        this.props.item.place_id,
                        " "
                    ),
                    React.createElement(
                        "p",
                        null,
                        " ",
                        this.props.item.desc,
                        " "
                    ),
                    React.createElement(
                        "span",
                        { className: "id-span" },
                        this.props.item.loc_id
                    )
                )
            );
        }
    }]);

    return Item;
}(React.Component);