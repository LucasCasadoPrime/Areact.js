class Area {
    constructor(areaId, areaName, action, actionParams, reaction,reactionParams, user) {
        this.areaId = areaId;
        this.areaName = areaName
        this.action = action;
        this.reaction = reaction;
        this.actionParams = actionParams;
        this.reactionParams = reactionParams;
        this.user = user;
        this.data = {};
    }

    getAreaId() {
        return this.areaId;
    }

    getAreaName() {
        return this.areaName;
    }

    getAction() {
        return this.action;
    }

    getReaction() {
        return this.reaction;
    }

    getActionParams() {
        return this.actionParams;
    }

    getReactionParams() {
        return this.reactionParams;
    }

    getUser() {
        return this.user;
    }

    getData() {
        return this.data;
    }

    setAreaName(areaName) {
        this.areaName = areaName;
    }
}

module.exports = Area;