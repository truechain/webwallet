'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));


// var React = require('react');
// var _assign = _interopRequireDefault( require('domkit/appendVendorPrefix') );
// var _insertKeyframesRule = _interopRequireDefault( require('domkit/insertKeyframesRule') );

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'        
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'        
    }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = 'right-rotate' // insertKeyframesRule.default(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = 'left-rotate' // insertKeyframesRule.default(leftRotateKeyframes);

// console.log(_react.default);
class Loader extends _react.default.Component{

    constructor(props) {
        super(props)
        this.getCircleStyle = this.getCircleStyle.bind(this)
        this.getAnimationStyle = this.getAnimationStyle.bind(this)
        this.getStyle = this.getStyle.bind(this)
        this.renderLoader = this.renderLoader.bind(this)
    }

    getCircleStyle(size) {
        return {
            width: size,
            height: size,
            border: size / 10 + 'px solid ' + this.props.color,
            opacity: 0.4,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    }

    getAnimationStyle(i) {
        var animation = [i == 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        var perspective = '800px';

        return {
            perspective: perspective,
            WebkitPerspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode,
        };
    }
    getStyle(i) {
        var size = parseInt(this.props.size);

        if (i) {
            return Object.assign(this.getCircleStyle(size), this.getAnimationStyle(i), {
                position: 'absolute',
                top: 0,
                left: 0
            });
        }

        return {
            width: size,
            height: size,
            position: 'relative'
        };
    }

    renderLoader(loading) {
        if (loading) {
            return _react.default.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                _react.default.createElement(
                    'div',
                    { style: this.getStyle(0) },
                    _react.default.createElement('div', { style: this.getStyle(1) }),
                    _react.default.createElement('div', { style: this.getStyle(2) })
                )
            );
        }
        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}

Loader.displayName='Loader';
Loader.defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '60px'
};

// var Loader = _react.default.createClass({
//     displayName: 'Loader',

//     /**
//      * @type {Object}
//      */
//     // propTypes: {
//     //     loading: React.PropTypes.bool,
//     //     color: React.PropTypes.string,
//     //     size: React.PropTypes.string,
//     //     margin: React.PropTypes.string
//     // },

//     /**
//      * @return {Object}
//      */
//     getDefaultProps: function getDefaultProps() {
//         return {
//             loading: true,
//             color: '#ffffff',
//             size: '60px'
//         };
//     },

//     /**
//      * @param {String} size
//      * @return {Object}
//      */
//     getCircleStyle: function getCircleStyle(size) {
//         return {
//             width: size,
//             height: size,
//             border: size / 10 + 'px solid ' + this.props.color,
//             opacity: 0.4,
//             borderRadius: '100%',
//             verticalAlign: this.props.verticalAlign
//         };
//     },

//     /**
//      * @param  {Number} i
//      * @return {Object}
//      */
//     getAnimationStyle: function getAnimationStyle(i) {
//         var animation = [i == 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
//         var animationFillMode = 'forwards';
//         var perspective = '800px';

//         return {
//             perspective: perspective,
//             '-webkit-perspective': perspective,
//             animation: animation,
//             animationFillMode: animationFillMode,
//             '-webkit-animation-fill-mode': animationFillMode,
//         };
//     },

//     /**
//      * @param  {Number} i
//      * @return {Object}
//      */
//     getStyle: function getStyle(i) {
//         var size = parseInt(this.props.size);

//         if (i) {
//             return Object.assign(this.getCircleStyle(size), this.getAnimationStyle(i), {
//                 position: 'absolute',
//                 top: 0,
//                 left: 0
//             });
//         }

//         return {
//             width: size,
//             height: size,
//             position: 'relative'
//         };
//     },

//     /**
//      * @param  {Boolean} loading
//      * @return {ReactComponent || null}
//      */
//     renderLoader: function renderLoader(loading) {
//         if (loading) {
//             return _react.default.createElement(
//                 'div',
//                 { id: this.props.id, className: this.props.className },
//                 _react.default.createElement(
//                     'div',
//                     { style: this.getStyle(0) },
//                     _react.default.createElement('div', { style: this.getStyle(1) }),
//                     _react.default.createElement('div', { style: this.getStyle(2) })
//                 )
//             );
//         }

//         return null;
//     },

//     render: function render() {
//         return this.renderLoader(this.props.loading);
//     }
// });

exports.default = Loader;

// module.exports = Loader;