'use client';
import dynamic from 'next/dynamic';

const ExpensePieChart = dynamic(() => import('./CategoryPiechart'), { ssr: false });

export default ExpensePieChart;
