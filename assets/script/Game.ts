// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property({type:cc.Prefab})
    startPerFab:any = null;
    @property({type:cc.Node})
    ground:any = null;
    @property({type:cc.Node})
    player:any = null;
    @property({type:cc.Node})
    gameOverNode:any = null;
    @property({type:cc.Label})
    scorePlay:any = null;
    @property({type:cc.AudioClip})
    scoreAuio
    @property({type:cc.Node})
    btnStart
    @property
    groundY:number = 0;
    @property
    groundX:number = 0;
    @property
    score:number = 0;
    @property
    maxStart:number = 0;
    @property
    minStart:number = 0;
    @property
    timer:any = 0;
    @property
    startDura:any = 0;
    @property
    currentStart




    // LIFE-CYCLE CALLBACKS:

    public onLoad () {
        //记录星星显示的有效时长
        this.timer = 0;
        //记录星星是显示时长
        this.startDura = 0;

        //获取地平面的高度
        this.groundY = this.ground.y + this.ground.height/2
        // //随机生星星
        // this.newStart();

        this.score = 0;
        this.enabled = false;

        //
        this.currentStart = null;

    }

    public update (dt) {
        if(this.timer > this.startDura){
            this.gameOver();
            return;
        }
        this.timer += dt;
    }
    public gameOver(){
        this.enabled = false;
        this.player.getComponent('Play').enabled = false;
        this.player.stopAllActions();
        this.btnStart.x = 0;
        this.currentStart.destroy();
        //激活节点
        this.gameOverNode.active = true;
    }
    public onStartGame(){
       this.resetScore();
       this.enabled = true;
       //隐藏按钮
       this.btnStart.x = 1000;
       //小怪兽初始化
    //    console.log(this.player.getComponent('Play'))
       this.player.getComponent('Play').init(cc.v2(0,this.groundY))
      //随机生星星
      this.newStart();
      //关闭节点
      this.gameOverNode.active = false;

    }
    public resetScore(){
        this.score = 0;
        this.scorePlay.string = "Score:"+this.score;
    }
    public newStart(){
        let newStart = cc.instantiate(this.startPerFab);
        this.node.addChild(newStart);
        //将game引入注入到start
        // newStart.getComponent('Start').game = this;
        console.log(newStart.getComponent('Start'))
        newStart.getComponent('Start').init(this);

        newStart.setPosition(this.getNewStartPosition())
        
        //保存当前星星的饮用
        this.currentStart = newStart;

        this.startDura = this.minStart + Math.random()*(this.maxStart - this.minStart);
        this.timer = 0;

    }

    public getNewStartPosition(){
        let randY = this.groundY + Math.random()*this.player.getComponent('Play').jumpHeight+30;
        let max = this.node.width/2 ;
        let randX = (Math.random()-0.5) * 2*max;
        return cc.v2(randX,randY)
    }
    //获取分数
    public gainScore(){
        this.score +=1
        this.scorePlay.string = "Score:" + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAuio,false)

    }
}
