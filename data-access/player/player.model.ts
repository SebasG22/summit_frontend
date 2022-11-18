import { Team } from "../team/team.model";

export enum PlayerPosition {
    GK = "GK",
    CM = "CM",
    CDM = "CDM",
    ST = "ST",
    CAM = "CAM",
    CB = "CB",
    RB = "RB",
    RWB = "RWB",
    LWB = "LWB",
    LR = "LR",
    LW = "LW"
}

export enum PlayerFoot {
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

export interface Player {
    id: string;
    name: string;
    team: Team;
    teamId: string;
    positions: PlayerPosition[];
    birth: string;
    height: number;
    weight: number;
    foot: PlayerFoot;
}