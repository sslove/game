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
export default class Play extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    //跳跃高度
    @property
    jumpHeight:number = 0;
    //跳跃持续时间
    @property
    jumpDuration:number = 0;
    //最大的移动距离
    @property
    maxMoveSpeed:number = 0;
    //加速度
    @property
    accel:number = 0;
    @property
    accLeft:boolean = false;
    @property
    accRight:boolean = false;
    @property
    xSpeed:number = 0;
    @property({type:cc.AudioClip})
    jumpAudio

     // 生命周期
    public onLoad () {
        this.enabled = false;
    //   //this代表绑定的当前组件
    //   this.node.runAction(this.setJumpAction());
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    

    // start () {

    // }

    public update (dt) {
        //dt每一帧运行的时间
        if(this.accLeft) {
            this.xSpeed -= this.accel*dt
        } else if(this.accRight){
            this.xSpeed += this.accel*dt
        }

        if(Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed/Math.abs(this.xSpeed)   
        }
        //100像素/秒  60帧/秒 ？1帧多少像素
        this.node.x += this.xSpeed * dt;
        if(this.node.x > this.node.parent.width/2){
            this.node.x = this.node.parent.width/2;
            this.xSpeed = 0;
        }else if(this.node.x < -this.node.parent.width/2){
            this.node.x = -this.node.parent.width/2;
            this.xSpeed = 0;
        }
    }
    //初始化函数
    public init(pos){
        this.enabled = true;
        this.xSpeed = 0;
        this.node.setPosition(pos)
        //this代表绑定的当前组件
       this.node.runAction(this.setJumpAction());
    }

    public onDestroy () {
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)
    }


   //弹跳
    public setJumpAction(){
        let jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        let callBack = cc.callFunc(this.palyerSond,this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callBack));
    }
    //引入音乐
    public palyerSond(){
        cc.audioEngine.playEffect(this.jumpAudio,false)
    }
    //按键
    public onKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.b:
                this.accRight = true;
                break;
        }

    }
    public onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.b:
                this.accRight = false;
                break;
        }
    }
}
