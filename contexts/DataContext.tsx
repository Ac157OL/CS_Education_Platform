
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { TeachingCase, PracticeRecord, ScienceResource } from '../types';
import { INITIAL_TEACHING_CASES, INITIAL_PRACTICE_RECORDS, INITIAL_SCIENCE_RESOURCES } from '../constants';

interface DataContextType {
  teachingCases: TeachingCase[];
  practiceRecords: PracticeRecord[];
  scienceResources: ScienceResource[];
  addTeachingCase: (newCase: TeachingCase) => void;
  addPracticeRecord: (newRecord: PracticeRecord) => void;
  addScienceResource: (newResource: ScienceResource) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [teachingCases, setTeachingCases] = useState<TeachingCase[]>(INITIAL_TEACHING_CASES);
  const [practiceRecords, setPracticeRecords] = useState<PracticeRecord[]>(INITIAL_PRACTICE_RECORDS);
  const [scienceResources, setScienceResources] = useState<ScienceResource[]>(INITIAL_SCIENCE_RESOURCES);

  const addTeachingCase = (newCase: TeachingCase) => {
    setTeachingCases(prev => [newCase, ...prev]); // Add to the beginning
  };

  const addPracticeRecord = (newRecord: PracticeRecord) => {
    setPracticeRecords(prev => [newRecord, ...prev]);
  };

  const addScienceResource = (newResource: ScienceResource) => {
    setScienceResources(prev => [newResource, ...prev]);
  };

  return (
    <DataContext.Provider value={{ 
      teachingCases, 
      practiceRecords, 
      scienceResources,
      addTeachingCase,
      addPracticeRecord,
      addScienceResource
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
