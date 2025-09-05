import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <Construction className="h-8 w-8 text-gray-400" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">
            {description || "This page is under construction. Please check back later or continue browsing our other sections."}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Would you like this page to be implemented? Just ask me to create it!
          </p>
          
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
