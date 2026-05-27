// hooks/useApplications.ts
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Application {
  id: string;
  referenceNo: string;
  productName: string;
  status: string;
  submittedAt: string;
  slaDeadline: string;
}

export function useApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applications");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  return { applications, isLoading, error };
}