import { getExams } from './actions'
import { ExamCard } from '@/components/exams/ExamCard'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ExamsPage() {
    const exams = await getExams()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Track your upcoming exams and preparation.
                    </p>
                </div>
                <Link
                    href="/exams/new"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Exam
                </Link>
            </div>

            {exams.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="text-center">
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No exams scheduled</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your first exam.</p>
                        <div className="mt-6">
                            <Link
                                href="/exams/new"
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                <Plus className="h-4 w-4" />
                                Add Exam
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {exams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} />
                    ))}
                </div>
            )}
        </div>
    )
}
