function RandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function WifesGlobalState() {
    State.call(this);
}

WifesGlobalState.prototype = new State();
WifesGlobalState.prototype.constructor = WifesGlobalState;

WifesGlobalState.prototype.Enter = function(wife) {
};
WifesGlobalState.prototype.Execute = function(wife) {
    if ( Math.random() < 0.1) {
        wife.GetFSM().ChangeState(visitBathroom);
    }
}
WifesGlobalState.prototype.Exit = function(wife) {}
WifesGlobalState.prototype.OnMessage = function(wife,msg) {
    switch(msg.Msg) {
        case message_type.Msg_HiHoneyImHome: {
            console.log(GetNameOfEntity(wife.ID()),":","Hi honey. Let me make you some of mah fine country stew"); 
            wife.GetFSM().ChangeState(cookStew);
        }
        return true;
    }
    return false;
}



function DoHouseWork() {
    State.call(this);
}

DoHouseWork.prototype = new State();
DoHouseWork.prototype.constructor = DoHouseWork;

DoHouseWork.prototype.Enter = function(wife) {}
DoHouseWork.prototype.Execute = function(wife) {
    switch (RandomInt(0,2)) {
        case 0: 
            console.log(GetNameOfEntity(wife.ID()),":","Moppin' the floor");
            break;
        case 1:
            console.log(GetNameOfEntity(wife.ID()),":","Washin' the dishes");
            break;
        case 2:
            console.log(GetNameOfEntity(wife.ID()),":","Makin' the bed");
            break;
    }
}
DoHouseWork.prototype.Exit = function(wife) {}
DoHouseWork.prototype.OnMessage = function(wife,msg) { return false;}

function VisitBathroom() {
    State.call(this);
}

VisitBathroom.prototype = new State();
VisitBathroom.prototype.constructor = VisitBathroom;

VisitBathroom.prototype.Enter = function(wife) {
    console.log(GetNameOfEntity(wife.ID()),":","Walkin' to the can. Need to powda mah pretty li'lle nose");
}
VisitBathroom.prototype.Execute = function(wife) {
    console.log(GetNameOfEntity(wife.ID()),":","Ahhhhhh! Sweet relief!");
    wife.GetFSM().RevertToPreviousState();
}
VisitBathroom.prototype.Exit = function(wife) {
    console.log(GetNameOfEntity(wife.ID()),":","Leavin' the Jon");
}
VisitBathroom.prototype.OnMessage = function(wife,msg) { return false;}

function CookStew() {
    State.call(this);
}

CookStew.prototype = new State();
CookStew.prototype.constructor = CookStew;

CookStew.prototype.Enter = function(wife) {
    if (!wife.Cooking()) {
        console.log(GetNameOfEntity(wife.ID()),":","Putting the stew in the oven");
        messageDispatcher.DispatchMessage(1.5, wife.ID(), wife.ID(), 
                                          message_type.Msg_StewReady, NO_ADDITIONAL_INFO);
        wife.SetCooking(true);
    }    
}
CookStew.prototype.Execute = function(wife) {
    console.log(GetNameOfEntity(wife.ID()),":","Fussin' over food");
}
CookStew.prototype.Exit = function(wife) {
    console.log(GetNameOfEntity(wife.ID()),":","Puttin' the stew on the table");
}
CookStew.prototype.OnMessage = function(wife,msg) {
    switch(msg.Msg) {
        case message_type.Msg_StewReady: {
            console.log(GetNameOfEntity(wife.ID()),":","StewReady! Lets eat");
            messageDispatcher.DispatchMessage(SEND_MSG_IMMEDIATELY,
                                              wife.ID(),
                                              names.ent_Miner_Bob,
                                              message_type.Msg_StewReady,
                                              NO_ADDITIONAL_INFO);
            wife.SetCooking(false);
            wife.GetFSM().ChangeState(doHouseWork);
        }
        return true;
    }
    return false;
}


var doHouseWork = new DoHouseWork();
var visitBathroom = new VisitBathroom();
var wifesGlobalState = new WifesGlobalState();