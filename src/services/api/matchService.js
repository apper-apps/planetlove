class MatchService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'match';
  }
  
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "age" } },
          { field: { Name: "location" } },
          { field: { Name: "photo" } },
          { field: { Name: "mbti_type" } },
          { field: { Name: "love_languages" } },
          { field: { Name: "compatibility_score" } },
          { field: { Name: "matched_on" } },
          { field: { Name: "last_message" } },
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
        console.error("Error fetching matches:", error?.response?.data?.message);
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
          { field: { Name: "mbti_type" } },
          { field: { Name: "love_languages" } },
          { field: { Name: "compatibility_score" } },
          { field: { Name: "matched_on" } },
          { field: { Name: "last_message" } },
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
        console.error(`Error fetching match with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async create(match) {
    try {
      const params = {
        records: [{
          Name: match.Name,
          age: match.age,
          location: match.location,
          photo: match.photo,
          mbti_type: match.mbti_type,
          love_languages: match.love_languages,
          compatibility_score: match.compatibility_score,
          matched_on: match.matched_on,
          last_message: match.last_message,
          is_online: match.is_online
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
          console.error(`Failed to create match ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create match');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating match:", error?.response?.data?.message);
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
          ...(data.mbti_type && { mbti_type: data.mbti_type }),
          ...(data.love_languages && { love_languages: data.love_languages }),
          ...(data.compatibility_score && { compatibility_score: data.compatibility_score }),
          ...(data.matched_on && { matched_on: data.matched_on }),
          ...(data.last_message && { last_message: data.last_message }),
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
          console.error(`Failed to update match ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update match');
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating match:", error?.response?.data?.message);
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
        console.error("Error deleting match:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const matchService = new MatchService();