import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserIdInputProps {
  onSubmit: (userId: string) => void;
  isLoading: boolean;
}

export const UserIdInput = ({ onSubmit, isLoading }: UserIdInputProps) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onSubmit(userId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mb-8">
      <Input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !userId.trim()}>
        {isLoading ? 'Loading...' : 'Get Recommendations'}
      </Button>
    </form>
  );
};