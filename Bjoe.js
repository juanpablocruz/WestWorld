function Bjoe(id) {
    this.m_Location = location_type.saloon;
    this.m_iHp = 5;
    this.m_bTaunted = false;

    this.m_pStateMachine = new StateMachine(this);
    this.m_pStateMachine.SetCurrentState(bjoeGlobalState);
    this.m_pStateMachine.SetGlobalState(bjoeGlobalState);

    BaseGameEntity.call(this,id);
}

Bjoe.prototype = Object.create(BaseGameEntity.prototype);

Bjoe.prototype.update = function(){
    this.m_pStateMachine.update();
}
Bjoe.prototype.GetFSM = function(){ return this.m_pStateMachine;}
Bjoe.prototype.Location = function(){ return this.m_Location;}
Bjoe.prototype.ChangeLocation = function(loc){ this.m_Location = loc;}
Bjoe.prototype.Taunted = function(){ return this.m_bTaunted;}
Bjoe.prototype.SetTaunted = function(val){ this.m_bTaunted = val;}
Bjoe.prototype.DecreaseHP = function(val) { this.m_iHp -= val;}
Bjoe.prototype.HP = function() { return this.m_iHp;}
Bjoe.prototype.SetHP = function(val) { this.m_iHp = val;}

Bjoe.prototype.HandleMessage = function(msg){
    return this.m_pStateMachine.HandleMessage(msg);
}

