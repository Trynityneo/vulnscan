"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Save, Edit, Trash2, Search } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: 'scan' | 'vulnerability' | 'analysis' | 'general';
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Network Scan Results - 192.168.1.0/24',
      content: 'Found 23 active hosts. Notable findings:\n- Port 22 open on multiple hosts\n- Web server on 192.168.1.10 running outdated nginx\n- Database server on 192.168.1.15 needs attention',
      category: 'scan',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Critical Vulnerability Assessment',
      content: 'CVE-2023-12345 affects the main web application:\n- SQL injection possible in login form\n- Immediate patching required\n- Workaround: Input validation on frontend',
      category: 'vulnerability',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    }
  ]);

  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'general' as Note['category'] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log("Notes page rendered with", notes.length, "notes");

  const handleSaveNote = () => {
    console.log("Saving note:", newNote.title);
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', category: 'general' });
    console.log("Note saved successfully");
  };

  const handleDeleteNote = (id: string) => {
    console.log("Deleting note:", id);
    setNotes(notes.filter(note => note.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'scan': return 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30';
      case 'vulnerability': return 'bg-cyber-red/20 text-cyber-red border-cyber-red/30';
      case 'analysis': return 'bg-cyber-amber/20 text-cyber-amber border-cyber-amber/30';
      default: return 'bg-cyber-green/20 text-cyber-green border-cyber-green/30';
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-cyber-blue" />
        <h1 className="text-2xl font-bold text-cyber-text glow-text">Security Notes</h1>
      </div>

      {/* Search */}
      <Card className="cyber-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-muted" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 cyber-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* New Note Form */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-cyber-text flex items-center space-x-2">
            <Plus className="h-5 w-5 text-cyber-green" />
            <span>Create New Note</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="cyber-input"
              />
            </div>
            <div>
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value as Note['category'] })}
                className="w-full h-10 px-3 rounded-md bg-cyber-surface border border-cyber-blue/30 text-cyber-text"
              >
                <option value="general">General</option>
                <option value="scan">Scan Results</option>
                <option value="vulnerability">Vulnerability</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
          </div>

          <Textarea
            placeholder="Write your security notes here... Support for markdown formatting."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="min-h-32 cyber-input"
          />

          <Button onClick={handleSaveNote} className="cyber-button">
            <Save className="h-4 w-4 mr-2" />
            Save Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="cyber-card hover:bg-cyber-blue/5 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-cyber-text">{note.title}</h3>
                    <Badge variant="outline" className={getCategoryColor(note.category)}>
                      {note.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-cyber-muted">
                    Created: {note.createdAt.toLocaleDateString()} | 
                    Updated: {note.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cyber-muted hover:text-cyber-blue"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-cyber-muted hover:text-cyber-red"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-cyber-text whitespace-pre-wrap text-sm">
                {note.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && searchTerm && (
        <Card className="cyber-card">
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-cyber-muted mx-auto mb-4" />
            <p className="text-cyber-muted">No notes found matching "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
      </div>
    </DashboardLayout>
  );
}