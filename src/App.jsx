import React from 'react';
import { Layout } from './components/layout/Layout';
import { SecondaryPanel } from './components/layout/SecondaryPanel';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Card } from './components/ui/Card';
import { Play, Settings, Save } from 'lucide-react';

function App() {
  const sidebarContent = (
    <SecondaryPanel
      explanation="Define the core parameters for the new project. Ensure all fields are filled before proceeding to the next step."
      promptText="Create a new React component called 'UserProfile' that displays the user's avatar, name, and bio. Use the Card component as a wrapper."
    />
  );

  return (
    <Layout
      projectName="KodNest Premium System"
      step={1}
      totalSteps={4}
      status="in-progress"
      title="Project Configuration"
      description="Configure the initial settings for your new build. This will set the foundation for the generated code."
      sidebar={sidebarContent}
    >
      <div className="form-section">

        <Card title="General Information">
          <div className="form-section">
            <Input label="Project Name" placeholder="e.g. My Awesome App" />
            <Input label="Description" placeholder="Briefly describe what you are building..." />
            <div className="form-row">
              <Input label="Version" placeholder="1.0.0" className="flex-1" />
              <Input label="Author" placeholder="Your Name" className="flex-1" />
            </div>
          </div>
        </Card>

        <Card title="Environment Settings">
          <p className="form-description">
            Select the environment variables that should be included in the build.
          </p>
          <div className="env-config">
            <Button variant="secondary" icon={Settings}>Configure Env</Button>
            <Button variant="secondary">View Logs</Button>
          </div>
        </Card>

        <div className="action-bar">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" icon={Save}>Save Configuration</Button>
          <Button variant="primary" icon={Play} style={{ backgroundColor: '#4A7C59', borderColor: '#4A7C59' }}>
            Start Build
          </Button>
        </div>

      </div>
    </Layout>
  );
}

export default App;
