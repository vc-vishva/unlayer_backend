const express = require('express');
const router = express.Router();
const templateService = require('../services/templateService');

// Create/Save template
router.post('/templates', async (req, res) => {
  try {
    const template = await templateService.createTemplate(req.body);
    
    console.log(`Template saved with ID: ${template._id}`);

    res.status(201).json({
      success: true,
      message: 'Template saved successfully',
      _id: template._id,
      name: template.name,
      createdAt: template.createdAt
    });
  } catch (error) {
    console.error('Error saving template:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to save template' 
    });
  }
});

// Get all templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await templateService.getAllTemplates();
    
    res.json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch templates' 
    });
  }
});

// Get template by ID
router.get('/templates/:id', async (req, res) => {
  try {
    const template = await templateService.getTemplateById(req.params.id);
    
    res.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    const statusCode = error.message === 'Template not found' ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Get latest template
router.get('/templates/latest', async (req, res) => {
  try {
    const template = await templateService.getLatestTemplate();
    
    res.json(template);
  } catch (error) {
    console.error('Error fetching latest template:', error);
    res.status(404).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Update template
router.put('/templates/:id', async (req, res) => {
  try {
    const template = await templateService.updateTemplate(req.params.id, req.body);
    
    res.json({
      success: true,
      message: 'Template updated successfully',
      template
    });
  } catch (error) {
    console.error('Error updating template:', error);
    const statusCode = error.message === 'Template not found' ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Delete template
router.delete('/templates/:id', async (req, res) => {
  try {
    await templateService.deleteTemplate(req.params.id);
    
    res.json({
      success: true,
      message: 'Template deleted successfully',
      _id: req.params.id
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    const statusCode = error.message === 'Template not found' ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Search templates
router.get('/templates/search/:term', async (req, res) => {
  try {
    const templates = await templateService.searchTemplates(req.params.term);
    
    res.json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    console.error('Error searching templates:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to search templates' 
    });
  }
});

// Send email using template
router.post('/templates/send', async (req, res) => {
  try {
    const { templateId, recipient, subject } = req.body;

    if (!templateId || !recipient) {
      return res.status(400).json({ 
        success: false,
        error: 'Template ID and recipient are required' 
      });
    }

    const template = await templateService.getTemplateById(templateId);

    // Here you would integrate with an email service
    console.log('Email send request:', {
      recipient,
      subject,
      templateId,
      htmlLength: template.html.length,
    });

    res.json({
      success: true,
      message: 'Email would be sent (integrate email service)',
      recipient,
      templateId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;