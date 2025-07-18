class SimulationService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'simulation';
  }
  
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "participants" } },
          { field: { Name: "question_sequence" } },
          { field: { Name: "responses" } },
          { field: { Name: "completion_rate" } },
          { field: { Name: "insights" } },
          { field: { Name: "started_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "status" } }
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
        console.error("Error fetching simulations:", error?.response?.data?.message);
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
          { field: { Name: "participants" } },
          { field: { Name: "question_sequence" } },
          { field: { Name: "responses" } },
          { field: { Name: "completion_rate" } },
          { field: { Name: "insights" } },
          { field: { Name: "started_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "status" } }
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
        console.error(`Error fetching simulation with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async getActive() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "participants" } },
          { field: { Name: "question_sequence" } },
          { field: { Name: "responses" } },
          { field: { Name: "completion_rate" } },
          { field: { Name: "insights" } },
          { field: { Name: "started_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "status" } }
        ],
        where: [
          {
            FieldName: "status",
            Operator: "EqualTo",
            Values: ["active"]
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
        throw new Error("No active simulation found");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching active simulation:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async create(simulation) {
    try {
      const params = {
        records: [{
          Name: simulation.Name,
          participants: simulation.participants,
          question_sequence: simulation.question_sequence,
          responses: simulation.responses,
          completion_rate: simulation.completion_rate,
          insights: simulation.insights,
          started_at: simulation.started_at,
          status: "active"
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
          console.error(`Failed to create simulation ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create simulation');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating simulation:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async addResponse(id, response) {
    try {
      // First get the current simulation
      const currentSimulation = await this.getById(id);
      const currentResponses = currentSimulation.responses || [];
      const updatedResponses = [...currentResponses, response];
      
      const params = {
        records: [{
          Id: id,
          responses: JSON.stringify(updatedResponses),
          completion_rate: (updatedResponses.length / 5) * 100 // Assuming 5 questions
        }]
      };
      
      const updateResponse = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!updateResponse.success) {
        console.error(updateResponse.message);
        throw new Error(updateResponse.message);
      }
      
      return updateResponse.results[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error adding response:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  async complete(id, responses) {
    try {
      const params = {
        records: [{
          Id: id,
          responses: JSON.stringify(responses),
          completion_rate: 100,
          status: "completed",
          completed_at: new Date().toISOString()
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
        console.error("Error completing simulation:", error?.response?.data?.message);
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
          ...(data.participants && { participants: data.participants }),
          ...(data.question_sequence && { question_sequence: data.question_sequence }),
          ...(data.responses && { responses: data.responses }),
          ...(data.completion_rate && { completion_rate: data.completion_rate }),
          ...(data.insights && { insights: data.insights }),
          ...(data.started_at && { started_at: data.started_at }),
          ...(data.completed_at && { completed_at: data.completed_at }),
          ...(data.status && { status: data.status })
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
        console.error("Error updating simulation:", error?.response?.data?.message);
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
        console.error("Error deleting simulation:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}

export const simulationService = new SimulationService();