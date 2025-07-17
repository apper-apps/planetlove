import profilesData from "@/services/mockData/profiles.json";

class ProfileService {
  constructor() {
    this.profiles = [...profilesData];
  }
  
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.profiles]);
      }, 300);
    });
  }
  
  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const profile = this.profiles.find(p => p.Id === id);
        if (profile) {
          resolve({ ...profile });
        } else {
          reject(new Error("Profile not found"));
        }
      }, 200);
    });
  }
  
  async create(profile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProfile = {
          ...profile,
          Id: Math.max(...this.profiles.map(p => p.Id)) + 1,
          compatibilityScore: Math.floor(Math.random() * 30) + 70,
          isOnline: true
        };
        this.profiles.push(newProfile);
        resolve({ ...newProfile });
      }, 400);
    });
  }
  
  async update(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.profiles.findIndex(p => p.Id === id);
        if (index !== -1) {
          this.profiles[index] = { ...this.profiles[index], ...data };
          resolve({ ...this.profiles[index] });
        } else {
          reject(new Error("Profile not found"));
        }
      }, 300);
    });
  }
  
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.profiles.findIndex(p => p.Id === id);
        if (index !== -1) {
          this.profiles.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("Profile not found"));
        }
      }, 200);
    });
  }
}

export const profileService = new ProfileService();