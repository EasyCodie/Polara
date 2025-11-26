import { createExam } from '../actions'
import { getCourses } from '../../courses/actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewExamPage() {
    const courses = await getCourses()

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/exams"
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Exam</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Schedule an upcoming exam to track your preparation.
                    </p>
                </div>
            </div>

            <form action={createExam} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-white">
                        Exam Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="e.g. Midterm Exam"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="courseId" className="text-sm font-medium text-gray-900 dark:text-white">
                        Course
                    </label>
                    <select
                        name="courseId"
                        id="courseId"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium text-gray-900 dark:text-white">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium text-gray-900 dark:text-white">
                            Time
                        </label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            required
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="topics" className="text-sm font-medium text-gray-900 dark:text-white">
                        Topics / Syllabus
                    </label>
                    <textarea
                        name="topics"
                        id="topics"
                        rows={4}
                        placeholder="List the main topics covered in this exam..."
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="targetGrade" className="text-sm font-medium text-gray-900 dark:text-white">
                        Target Grade (Optional)
                    </label>
                    <input
                        type="text"
                        name="targetGrade"
                        id="targetGrade"
                        placeholder="e.g. A, 90%+"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                        Create Exam
                    </button>
                </div>
            </form>
        </div>
    )
}
