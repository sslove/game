(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Play.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f9e76gZfZJLEon22irD603g', 'Play', __filename);
// script/Play.ts

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
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        //跳跃高度
        _this.jumpHeight = 0;
        //跳跃持续时间
        _this.jumpDuration = 0;
        //最大的移动距离
        _this.maxMoveSpeed = 0;
        //加速度
        _this.accel = 0;
        _this.accLeft = false;
        _this.accRight = false;
        _this.xSpeed = 0;
        return _this;
    }
    // 生命周期
    Play.prototype.onLoad = function () {
        this.enabled = false;
        //   //this代表绑定的当前组件
        //   this.node.runAction(this.setJumpAction());
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    // start () {
    // }
    Play.prototype.update = function (dt) {
        //dt每一帧运行的时间
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        //100像素/秒  60帧/秒 ？1帧多少像素
        this.node.x += this.xSpeed * dt;
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width;
            this.xSpeed = 0;
        }
        else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.xSpeed = 0;
        }
    };
    //初始化函数
    Play.prototype.init = function (pos) {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.setPosition(pos);
        //this代表绑定的当前组件
        this.node.runAction(this.setJumpAction());
    };
    Play.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    //弹跳
    Play.prototype.setJumpAction = function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callBack = cc.callFunc(this.palyerSond, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callBack));
    };
    //引入音乐
    Play.prototype.palyerSond = function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    };
    //按键
    Play.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.b:
                this.accRight = true;
                break;
        }
    };
    Play.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.b:
                this.accRight = false;
                break;
        }
    };
    __decorate([
        property
    ], Play.prototype, "jumpHeight", void 0);
    __decorate([
        property
    ], Play.prototype, "jumpDuration", void 0);
    __decorate([
        property
    ], Play.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property
    ], Play.prototype, "accel", void 0);
    __decorate([
        property
    ], Play.prototype, "accLeft", void 0);
    __decorate([
        property
    ], Play.prototype, "accRight", void 0);
    __decorate([
        property
    ], Play.prototype, "xSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Play.prototype, "jumpAudio", void 0);
    Play = __decorate([
        ccclass
    ], Play);
    return Play;
}(cc.Component));
exports.default = Play;

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
        //# sourceMappingURL=Play.js.map
        