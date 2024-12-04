import React, { useState } from 'react';
import { Search, MapPin, Building2, Clock, Filter, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CommunityHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-8 h-8" />
        <h1 className="text-2xl font-bold">AI Pilipinas Cebu</h1>
      </div>
      <p className="text-lg mb-4">Empowering Cebu's AI Community</p>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Cebu City, Philippines</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>500+ Members</span>
        </div>
      </div>
    </div>
  );
};

const SearchSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search job titles, skills, or companies" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">Machine Learning</Badge>
        <Badge variant="secondary">Data Science</Badge>
        <Badge variant="secondary">Remote</Badge>
        <Badge variant="secondary">Entry Level</Badge>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
          <Badge variant={job.type === 'Full-time' ? 'default' : 'outline'}>
            {job.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-4">{job.description}</p>
        <div className="flex gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-50">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.posted}</span>
          </div>
          <Button variant="outline">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CommunitySection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Community Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="font-medium">AI Meetup: Machine Learning in Practice</h4>
              <p className="text-sm text-gray-600">Dec 15, 2024 • Cebu IT Park</p>
            </div>
            <Button variant="outline" className="ml-auto">RSVP</Button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <h4 className="font-medium">Workshop: Getting Started with AI Development</h4>
              <p className="text-sm text-gray-600">Dec 20, 2024 • Virtual</p>
            </div>
            <Button variant="outline" className="ml-auto">RSVP</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const JobBoard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const jobs = [
    {
      title: 'AI Research Engineer',
      company: 'TechHub Cebu',
      location: 'Cebu Business Park',
      type: 'Full-time',
      description: 'Join our research team in developing cutting-edge AI solutions for local businesses.',
      skills: ['Python', 'TensorFlow', 'Machine Learning'],
      posted: 'Posted 2 days ago'
    },
    {
      title: 'Machine Learning Developer',
      company: 'InnovateX',
      location: 'Remote - Philippines',
      type: 'Contract',
      description: 'Looking for ML developers to work on exciting computer vision projects.',
      skills: ['PyTorch', 'Computer Vision', 'Deep Learning'],
      posted: 'Posted 3 days ago'
    },
    {
      title: 'Junior Data Scientist',
      company: 'Cebu AI Solutions',
      location: 'IT Park, Cebu',
      type: 'Full-time',
      description: 'Great opportunity for fresh graduates interested in data science and analytics.',
      skills: ['Python', 'SQL', 'Data Analysis'],
      posted: 'Posted 1 week ago'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <CommunityHeader />
      <SearchSection />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="fulltime">Full-time</TabsTrigger>
              <TabsTrigger value="contract">Contract</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <CommunitySection />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-medium">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Positions</span>
                  <span className="font-medium">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Companies Hiring</span>
                  <span className="font-medium">12</span>
                </div>
                <Button className="w-full">Join Community</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
