import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }
  
  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.isActive);
        if (user) {
          resolve({ ...user });
        } else {
          reject(new Error("No active user found"));
        }
      }, 300);
    });
  }
  
  async createProfile(profileData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...profileData,
          Id: Math.max(...this.users.map(u => u.Id)) + 1,
          createdAt: new Date().toISOString(),
          isActive: true,
          interests: [],
          questionResponses: []
        };
        this.users.push(newUser);
        resolve({ ...newUser });
      }, 500);
    });
  }
  
  async updateProfile(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.users.findIndex(u => u.Id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...data };
          resolve({ ...this.users[index] });
        } else {
          reject(new Error("User not found"));
        }
      }, 300);
    });
  }
  
  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.Id === id);
        if (user) {
          resolve({ ...user });
        } else {
          reject(new Error("User not found"));
        }
      }, 200);
    });
  }
}

export const userService = new UserService();