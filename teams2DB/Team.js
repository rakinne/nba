class Team {
    constructor(name, id, nickname, conference) {
        this.name = name;
        this.id = id;
        this.nickname = nickname;
        this.conference = conference
    }
    getName() { return this.name };
    getId() { return this.id };
    getNickname() { return this.nickname };
    getConference() { return this.conference };
}

export { Team };