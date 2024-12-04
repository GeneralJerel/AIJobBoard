import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const JobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    employmentType: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    requiredSkills: '',
    jobDescription: '',
    applicationInstructions: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      employmentType: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Job posting submitted successfully!');
      // Reset form
      setFormData({
        companyName: '',
        jobTitle: '',
        employmentType: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        requiredSkills: '',
        jobDescription: '',
        applicationInstructions: '',
        contactEmail: ''
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post AI Job Opportunity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input
              required
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input
              required
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. AI Research Scientist"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Employment Type</label>
            <Select value={formData.employmentType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              required
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country or Remote"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary Range</label>
            <div className="flex gap-4">
              <Input
                name="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="Min"
                className="w-1/2"
              />
              <Input
                name="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="Max"
                className="w-1/2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Required Skills</label>
            <Textarea
              required
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              placeholder="List key skills and technologies required"
              className="h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea
              required
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Detailed job description, responsibilities, and requirements"
              className="h-32"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Application Instructions</label>
            <Textarea
              required
              name="applicationInstructions"
              value={formData.applicationInstructions}
              onChange={handleChange}
              placeholder="How to apply, required documents, application process"
              className="h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              required
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="hiring@company.com"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;
