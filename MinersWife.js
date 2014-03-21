function MinersWife(id) {
    this.m_Location = location_type.shack;

    this.m_bCooking = false;
    
    this.m_pStateMachine = new StateMachine(this);
    this.m_pStateMachine.SetCurrentState(doHouseWork);
    this.m_pStateMachine.SetGlobalState(wifesGlobalState);
    
    BaseGameEntity.call(this,id);
}

MinersWife.prototype = Object.create(BaseGameEntity.prototype);

MinersWife.prototype.update = function(){
    this.m_pStateMachine.update();
}
MinersWife.prototype.GetFSM = function(){ return this.m_pStateMachine;}
MinersWife.prototype.Location = function(){ return this.m_Location;}
MinersWife.prototype.ChangeLocation = function(loc){ this.m_Location = loc;}
MinersWife.prototype.Cooking = function(){ return this.m_bCooking;}
MinersWife.prototype.SetCooking = function(val){ this.m_bCooking = val;}


MinersWife.prototype.HandleMessage = function(msg){ 
    return this.m_pStateMachine.HandleMessage(msg);
}

