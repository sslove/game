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
export default class Start extends cc.Component {
    @property
    pickRadius:number = 0;
    @property({type:cc.Game})
    game:any = null;



    public update (dt) {
        if(this.getPlayPosition() < this.pickRadius){
            this.onPicked()
            return ; 
        }
    }
    public init(game){
        this.enabled = true;
        this.game = game;
        this.node.opacity = 255;
    }
    public getPlayPosition(){
        let playerPosition =  this.game.player.getPosition();
        let dis = this.node.position.sub(playerPosition).mag();
    
        return dis;
    }

    public onPicked(){
        //随机创建新的星星
        this.game.newStart();
        //获取分数
        this.game.gainScore();
        //将原来的星星销毁
        this.node.destroy();
    }

}
