(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Start.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5778abDs6RNL601RfcJ04c3', 'Start', __filename);
// script/Start.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Start = /** @class */ (function (_super) {
    __extends(Start, _super);
    function Start() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
    }
    Start.prototype.update = function (dt) {
        if (this.getPlayPosition() < this.pickRadius) {
            this.onPicked();
            return;
        }
    };
    Start.prototype.init = function (game) {
        this.enabled = true;
        this.game = game;
        this.node.opacity = 255;
    };
    Start.prototype.getPlayPosition = function () {
        var playerPosition = this.game.player.getPosition();
        var dis = this.node.position.sub(playerPosition).mag();
        return dis;
    };
    Start.prototype.onPicked = function () {
        //随机创建新的星星
        this.game.newStart();
        //获取分数
        this.game.gainScore();
        //将原来的星星销毁
        this.node.destroy();
    };
    __decorate([
        property
    ], Start.prototype, "pickRadius", void 0);
    __decorate([
        property({ type: cc.Game })
    ], Start.prototype, "game", void 0);
    Start = __decorate([
        ccclass
    ], Start);
    return Start;
}(cc.Component));
exports.default = Start;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Start.js.map
        