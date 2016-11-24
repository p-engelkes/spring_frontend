export class Team {
  public id: number;
  public teamName: string;
  public trainings: Training[] = [];

  constructor(json) {
    this.id = json.id;
    this.teamName = json.teamName;
    for (let trainingTime in json.trainingTimes)
    {
      this.trainings.push(new Training(trainingTime, json.trainingTimes[trainingTime]));
    }
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
