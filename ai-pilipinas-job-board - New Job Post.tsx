import React, { useState } from 'react';
import { Search, Briefcase, Building2, MapPin, Clock, DollarSign, ArrowLeft, Users, GraduationCap, Globe, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Job Post Form Component
const JobPostForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    category: '',
    aboutCompany: '',
    skills: [],
    responsibilities: [''],
    requirements: [''],
    benefits: ['']
  });

  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addSkill = (e) => {
    e?.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleListItemChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addListItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['title', 'company', 'location', 'type', 'experience', 'salary', 'description', 'category'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: Date.now(),
        posted: 'Just now'
      });
    }
  };

  const ListInput = ({ label, items, field }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => handleListItemChange(index, e.target.value, field)}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeListItem(index, field)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addListItem(field)}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Job Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., AI Research Engineer"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g., TechCorp Philippines"
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Cebu Business Park"
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Employment Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange(value, 'type')}
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Job Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange(value, 'category')}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Required</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 3-5 years"
                className={errors.experience ? 'border-red-500' : ''}
              />
              {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., ₱80,000 - ₱120,000"
                className={errors.salary ? 'border-red-500' : ''}
              />
              {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill"
                onKeyPress={(e) => e.key === 'Enter' && addSkill(e)}
              />
              <Button type="button" onClick={addSkill}>Add</Button>
            </div>
            {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map(skill => (
                <Badge 
                  key={skill}
                  variant="secondary"
                  className="bg-secondary/50 pl-2 pr-1 py-1"
                >
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-transparent"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter job description"
              className={`w-full min-h-[100px] p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* About Company */}
          <div className="space-y-2">
            <Label htmlFor="aboutCompany">About Company</Label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleInputChange}
              placeholder="Enter company description"
              className="w-full min-h-[100px] p-2 border rounded-md"
            />
          </div>

          {/* Lists */}
          <ListInput 
            label="Responsibilities" 
            items={formData.responsibilities} 
            field="responsibilities" 
          />

          <ListInput 
            label="Requirements" 
            items={formData.requirements} 
            field="requirements" 
          />

          <ListInput 
            label="Benefits" 
            items={formData.benefits} 
            field="benefits" 
          />

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Job Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

// Main Job Board Component
const JobBoard = () => {
  const initialJobs = [
    // ... (previous job data)
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateJob = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
    setShowForm(false);
  };

  // ... (previous filtering logic and other functions)

  if (showForm) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <JobPostForm 
          onSubmit={handleCreateJob}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {selectedJob ? (
        <JobDetailView job={selectedJob} />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">AI PILIPINAS Cebu Job Board</h1>
              <p className="text-muted-foreground text-lg">
                Discover your next opportunity in AI and Machine Learning
              </p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Post a Job
            </Button>
          </div>
          {/* Rest of the JobListView content */}
          {/* ... (previous JobListView JSX) */}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
