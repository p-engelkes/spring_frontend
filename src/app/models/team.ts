export class Team {
  public id: number;
  public teamName: string;
  public trainings: Training[] = [];

  create(teamName: string, trainings: Training[]) {
    this.teamName = teamName;
    this.trainings = trainings;

    return this;
  }

  deserialize(json) {
    this.id = json.id;
    this.teamName = json.teamName;
    for (let trainingTime in json.trainingTimes)
    {
      this.trainings.push(new Training(trainingTime, json.trainingTimes[trainingTime]));
    }

    return this;
  }
}

export class Training {
  public day: string;
  public time: string;

  constructor(day: string, time: string) {
    this.day = day;
    this.time = time;
  }
}
