import matchesData from "@/services/mockData/matches.json";

class MatchService {
  constructor() {
    this.matches = [...matchesData];
  }
  
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.matches]);
      }, 300);
    });
  }
  
  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const match = this.matches.find(m => m.Id === id);
        if (match) {
          resolve({ ...match });
        } else {
          reject(new Error("Match not found"));
        }
      }, 200);
    });
  }
  
  async create(match) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMatch = {
          ...match,
          Id: Math.max(...this.matches.map(m => m.Id)) + 1,
          matchedOn: new Date().toISOString(),
          isOnline: Math.random() > 0.5
        };
        this.matches.push(newMatch);
        resolve({ ...newMatch });
      }, 400);
    });
  }
  
  async update(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.matches.findIndex(m => m.Id === id);
        if (index !== -1) {
          this.matches[index] = { ...this.matches[index], ...data };
          resolve({ ...this.matches[index] });
        } else {
          reject(new Error("Match not found"));
        }
      }, 300);
    });
  }
  
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.matches.findIndex(m => m.Id === id);
        if (index !== -1) {
          this.matches.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("Match not found"));
        }
      }, 200);
    });
  }
}

export const matchService = new MatchService();