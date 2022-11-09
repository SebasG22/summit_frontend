import { Team } from "../team/team.model";

export enum PlayerPosition {
    GK,
    CM,
    CDM,
    ST,
    CAM,
    CB,
    RB,
    RWB,
    LWB,
    LR,
    LW
}

export enum PlayerFoot {
    LEFT,
    RIGHT
}

export interface Player {
    id: string;
    name: string;
    team?: Team;
    teamId: string;
    position: PlayerPosition[];
    birth: string;
    height: number;
    weight: number;
    foot: PlayerFoot;
}