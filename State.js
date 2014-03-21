function State() {
    
}

State.prototype.Enter = function(){}
State.prototype.Execute = function(){}
State.prototype.Exit = function(){}
State.prototype.OnMessage = function(ent,msg){}


function StateMachine (owner) {
    this.m_pOwner = owner;
    this.m_pCurrentState = null;
    this.m_pPreviousState = null;
    this.m_pGlobalState = null;
}

StateMachine.prototype.SetCurrentState = function(s) { this.m_pCurrentState = s; }
StateMachine.prototype.SetGlobalState = function(s) { this.m_pGlobalState = s; }
StateMachine.prototype.SetPreviousState = function(s) { this.m_pPreviousState = s; }

StateMachine.prototype.update = function() { 
    if ( this.m_pGlobalState) this.m_pGlobalState.Execute(this.m_pOwner);
    if ( this.m_pCurrentState) this.m_pCurrentState.Execute(this.m_pOwner);
}

StateMachine.prototype.ChangeState = function(pNewState) { 
    this.m_pPreviousState = this.m_pCurrentState;
    this.m_pCurrentState.Exit(this.m_pOwner);
    this.m_pCurrentState = pNewState;
    this.m_pCurrentState.Enter(this.m_pOwner);
}

StateMachine.prototype.RevertToPreviousState = function() { 
    this.ChangeState(this.m_pPreviousState);
}

StateMachine.prototype.isInState = function(st) { 
    return typeof(this.m_pCurrentState) == typeof(st);
}

StateMachine.prototype.CurrentState = function() { return this.m_pCurrentState; }
StateMachine.prototype.GlobalState = function() { return this.m_pGlobalState; }
StateMachine.prototype.PreviousState = function() { return this.m_pPreviousState; }
StateMachine.prototype.HandleMessage = function(msg) { 
    if (this.m_pCurrentState && this.m_pCurrentState.OnMessage(this.m_pOwner,msg))
        return true;
    else return false;
}