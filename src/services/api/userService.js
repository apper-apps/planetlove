class UserService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'app_User';
  }
  
  async getCurrentUser() {
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
          { field: { Name: "question_responses" } },
          { field: { Name: "interests" } },
          { field: { Name: "created_at" } },
          { field: { Name: "is_active" } }
        ],
        where: [
          {
            FieldName: "is_active",
            Operator: "EqualTo",
            Values: [true]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error("No active user found");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching current user:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async createProfile(profileData) {
    try {
      const params = {
        records: [{
          Name: profileData.Name,
          age: profileData.age,
          location: profileData.location,
          photo: profileData.photo,
          bio: profileData.bio,
          mbti_type: profileData.mbti_type,
          love_languages: profileData.love_languages,
          question_responses: profileData.question_responses,
          interests: profileData.interests,
          created_at: new Date().toISOString(),
          is_active: true
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
          console.error(`Failed to create user profile ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create user profile');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating user profile:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async updateProfile(id, data) {
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
          ...(data.question_responses && { question_responses: data.question_responses }),
          ...(data.interests && { interests: data.interests }),
          ...(data.created_at && { created_at: data.created_at }),
          ...(data.is_active !== undefined && { is_active: data.is_active })
        }]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.results[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user profile:", error?.response?.data?.message);
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
          { field: { Name: "question_responses" } },
          { field: { Name: "interests" } },
          { field: { Name: "created_at" } },
          { field: { Name: "is_active" } }
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
        console.error(`Error fetching user with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const userService = new UserService();