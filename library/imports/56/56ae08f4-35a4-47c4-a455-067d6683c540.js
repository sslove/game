"use strict";
cc._RF.push(module, '56ae0j0NaRHxKRVBn1mg8VA', 'Game');
// script/Game.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startPerFab = null;
        _this.ground = null;
        _this.player = null;
        _this.gameOverNode = null;
        _this.scorePlay = null;
        _this.groundY = 0;
        _this.groundX = 0;
        _this.score = 0;
        _this.maxStart = 0;
        _this.minStart = 0;
        _this.timer = 0;
        _this.startDura = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.onLoad = function () {
        //记录星星显示的有效时长
        this.timer = 0;
        //记录星星是显示时长
        this.startDura = 0;
        //获取地平面的高度
        this.groundY = this.ground.y + this.ground.height / 2;
        // //随机生星星
        // this.newStart();
        this.score = 0;
        this.enabled = false;
        //
        this.currentStart = null;
    };
    Game.prototype.update = function (dt) {
        if (this.timer > this.startDura) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    };
    Game.prototype.gameOver = function () {
        this.enabled = false;
        this.player.getComponent('Play').enabled = false;
        this.player.stopAllActions();
        this.btnStart.x = 0;
        this.currentStart.destroy();
        //激活节点
        this.gameOverNode.active = true;
    };
    Game.prototype.onStartGame = function () {
        this.resetScore();
        this.enabled = true;
        //隐藏按钮
        this.btnStart.x = 1000;
        //小怪兽初始化
        this.player.getComponent('Play').init(cc.v2(0, this.groundY));
        //随机生星星
        this.newStart();
        //关闭节点
        this.gameOverNode.active = false;
    };
    Game.prototype.resetScore = function () {
        this.score = 0;
        this.scorePlay.string = "Score:" + this.score;
    };
    Game.prototype.newStart = function () {
        var newStart = cc.instantiate(this.startPerFab);
        this.node.addChild(newStart);
        //将game引入注入到start
        // newStart.getComponent('Start').game = this;
        newStart.getComponent('Start').init(this);
        newStart.setPosition(this.getNewStartPosition());
        //保存当前星星的饮用
        this.currentStart = newStart;
        this.startDura = this.minStart + Math.random() * (this.maxStart - this.minStart);
        this.timer = 0;
    };
    Game.prototype.getNewStartPosition = function () {
        var randY = this.groundY + Math.random() * this.player.getComponent('Play').jumpHeight + 30;
        var max = this.node.width / 2;
        var randX = (Math.random() - 0.5) * 2 * max;
        return cc.v2(randX, randY);
    };
    //获取分数
    Game.prototype.gainScore = function () {
        this.score += 1;
        console.log(this.scorePlay);
        this.scorePlay.string = "Score:" + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAuio, false);
    };
    __decorate([
        property({ type: cc.Prefab })
    ], Game.prototype, "startPerFab", void 0);
    __decorate([
        property({ type: cc.Node })
    ], Game.prototype, "ground", void 0);
    __decorate([
        property({ type: cc.Node })
    ], Game.prototype, "player", void 0);
    __decorate([
        property({ type: cc.Node })
    ], Game.prototype, "gameOverNode", void 0);
    __decorate([
        property({ type: cc.Label })
    ], Game.prototype, "scorePlay", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Game.prototype, "scoreAuio", void 0);
    __decorate([
        property({ type: cc.Node })
    ], Game.prototype, "btnStart", void 0);
    __decorate([
        property
    ], Game.prototype, "groundY", void 0);
    __decorate([
        property
    ], Game.prototype, "groundX", void 0);
    __decorate([
        property
    ], Game.prototype, "score", void 0);
    __decorate([
        property
    ], Game.prototype, "maxStart", void 0);
    __decorate([
        property
    ], Game.prototype, "minStart", void 0);
    __decorate([
        property
    ], Game.prototype, "timer", void 0);
    __decorate([
        property
    ], Game.prototype, "startDura", void 0);
    __decorate([
        property
    ], Game.prototype, "currentStart", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();