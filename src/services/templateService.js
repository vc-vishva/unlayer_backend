const Template = require('../models/Template');
const mongoose = require('mongoose');

class TemplateService {
  
  // Create a new template
  async createTemplate(data) {
    try {
      const { name, design, html } = data;

      if (!design || !html) {
        throw new Error('Design and HTML are required');
      }

      const template = new Template({
        name: name || 'Untitled Template',
        design,
        html,
      });

      await template.save();
      return template;
    } catch (error) {
      throw error;
    }
  }

  // Get all templates
  async getAllTemplates() {
    try {
      const templates = await Template.find()
        .select('_id name createdAt updatedAt')
        .sort({ createdAt: -1 });
      
      return templates;
    } catch (error) {
      throw error;
    }
  }

  // Get template by ID
  async getTemplateById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid template ID');
      }

      const template = await Template.findById(id);

      if (!template) {
        throw new Error('Template not found');
      }

      return template;
    } catch (error) {
      throw error;
    }
  }

  // Get latest template
  async getLatestTemplate() {
    try {
      const template = await Template.findOne().sort({ createdAt: -1 });

      if (!template) {
        throw new Error('No templates found');
      }

      return template;
    } catch (error) {
      throw error;
    }
  }

  // Update template
  async updateTemplate(id, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid template ID');
      }

      const { name, design, html } = data;
      const updateData = {
        updatedAt: Date.now()
      };

      if (name) updateData.name = name;
      if (design) updateData.design = design;
      if (html) updateData.html = html;

      const template = await Template.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!template) {
        throw new Error('Template not found');
      }

      return template;
    } catch (error) {
      throw error;
    }
  }

  // Delete template
  async deleteTemplate(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid template ID');
      }

      const template = await Template.findByIdAndDelete(id);

      if (!template) {
        throw new Error('Template not found');
      }

      return template;
    } catch (error) {
      throw error;
    }
  }

  // Search templates by name
  async searchTemplates(searchTerm) {
    try {
      const templates = await Template.find({
        name: { $regex: searchTerm, $options: 'i' }
      })
      .select('_id name createdAt updatedAt')
      .sort({ createdAt: -1 });

      return templates;
    } catch (error) {
      throw error;
    }
  }

  // Get templates count
  async getTemplatesCount() {
    try {
      const count = await Template.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TemplateService();