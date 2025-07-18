class ProfileService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'profile';
  }
  
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "age" } },
          { field: { Name: "location" } },
          { field: { Name: "photo" } },
          { field: { Name: "bio" } },
          { field: { Name: "mbti_type" } },
          { field: { Name: "love_languages" } },
          { field: { Name: "compatibility_score" } },
          { field: { Name: "interests" } },
          { field: { Name: "is_online" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching profiles:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "age" } },
          { field: { Name: "location" } },
          { field: { Name: "photo" } },
          { field: { Name: "bio" } },
          { field: { Name: "mbti_type" } },
          { field: { Name: "love_languages" } },
          { field: { Name: "compatibility_score" } },
          { field: { Name: "interests" } },
          { field: { Name: "is_online" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching profile with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async create(profile) {
    try {
      const params = {
        records: [{
          Name: profile.Name,
          age: profile.age,
          location: profile.location,
          photo: profile.photo,
          bio: profile.bio,
          mbti_type: profile.mbti_type,
          love_languages: profile.love_languages,
          compatibility_score: profile.compatibility_score,
          interests: profile.interests,
          is_online: profile.is_online
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create profile ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create profile');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating profile:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async update(id, data) {
    try {
      const params = {
        records: [{
          Id: id,
          ...(data.Name && { Name: data.Name }),
          ...(data.age && { age: data.age }),
          ...(data.location && { location: data.location }),
          ...(data.photo && { photo: data.photo }),
          ...(data.bio && { bio: data.bio }),
          ...(data.mbti_type && { mbti_type: data.mbti_type }),
          ...(data.love_languages && { love_languages: data.love_languages }),
          ...(data.compatibility_score && { compatibility_score: data.compatibility_score }),
          ...(data.interests && { interests: data.interests }),
          ...(data.is_online !== undefined && { is_online: data.is_online })
        }]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update profile ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update profile');
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating profile:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting profile:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const profileService = new ProfileService();