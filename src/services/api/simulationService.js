import simulationsData from "@/services/mockData/simulations.json";

class SimulationService {
  constructor() {
    this.simulations = [...simulationsData];
  }
  
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.simulations]);
      }, 300);
    });
  }
  
  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const simulation = this.simulations.find(s => s.Id === id);
        if (simulation) {
          resolve({ ...simulation });
        } else {
          reject(new Error("Simulation not found"));
        }
      }, 200);
    });
  }
  
  async getActive() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const activeSimulation = this.simulations.find(s => s.status === "active");
        if (activeSimulation) {
          resolve({ ...activeSimulation });
        } else {
          reject(new Error("No active simulation found"));
        }
      }, 300);
    });
  }
  
  async create(simulation) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSimulation = {
          ...simulation,
          Id: Math.max(...this.simulations.map(s => s.Id)) + 1,
          startedAt: new Date().toISOString(),
          status: "active"
        };
        this.simulations.push(newSimulation);
        resolve({ ...newSimulation });
      }, 400);
    });
  }
  
  async addResponse(id, response) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.simulations.findIndex(s => s.Id === id);
        if (index !== -1) {
          this.simulations[index].responses.push(response);
          this.simulations[index].completionRate = 
            (this.simulations[index].responses.length / this.simulations[index].questionSequence.length) * 100;
          resolve({ ...this.simulations[index] });
        } else {
          reject(new Error("Simulation not found"));
        }
      }, 300);
    });
  }
  
  async complete(id, responses) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.simulations.findIndex(s => s.Id === id);
        if (index !== -1) {
          this.simulations[index].responses = responses;
          this.simulations[index].completionRate = 100;
          this.simulations[index].status = "completed";
          this.simulations[index].completedAt = new Date().toISOString();
          resolve({ ...this.simulations[index] });
        } else {
          reject(new Error("Simulation not found"));
        }
      }, 500);
    });
  }
  
  async update(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.simulations.findIndex(s => s.Id === id);
        if (index !== -1) {
          this.simulations[index] = { ...this.simulations[index], ...data };
          resolve({ ...this.simulations[index] });
        } else {
          reject(new Error("Simulation not found"));
        }
      }, 300);
    });
  }
  
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.simulations.findIndex(s => s.Id === id);
        if (index !== -1) {
          this.simulations.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("Simulation not found"));
        }
      }, 200);
    });
  }
}

export const simulationService = new SimulationService();