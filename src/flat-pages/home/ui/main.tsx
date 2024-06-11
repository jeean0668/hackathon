"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Home() {
  const [pageNum, setPageNum] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageNum) {
      router.push(`/main?pageNum=${pageNum}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">환영합니다!</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="number"
          value={pageNum}
          onChange={(e) => setPageNum(e.target.value)}
          className="border p-2 mr-2"
          placeholder="몇 분 전 데이터를 원하시나요?"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          검색
        </button>
      </form>
    </div>
  );
}
