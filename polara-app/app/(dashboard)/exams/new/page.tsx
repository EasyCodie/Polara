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
                    className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Create New Exam</h1>
                    <p className="text-sm text-muted-foreground">
                        Schedule an upcoming exam to track your preparation.
                    </p>
                </div>
            </div>

            <form action={createExam} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-foreground">
                        Exam Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="e.g. Midterm Exam"
                        className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="courseId" className="text-sm font-medium text-foreground">
                        Course
                    </label>
                    <select
                        name="courseId"
                        id="courseId"
                        required
                        className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
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
                        <label htmlFor="date" className="text-sm font-medium text-foreground">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium text-foreground">
                            Time
                        </label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            required
                            className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="topics" className="text-sm font-medium text-foreground">
                        Topics / Syllabus
                    </label>
                    <textarea
                        name="topics"
                        id="topics"
                        rows={4}
                        placeholder="List the main topics covered in this exam..."
                        className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="targetGrade" className="text-sm font-medium text-foreground">
                        Target Grade (Optional)
                    </label>
                    <input
                        type="text"
                        name="targetGrade"
                        id="targetGrade"
                        placeholder="e.g. A, 90%+"
                        className="block w-full rounded-lg border border-input bg-background p-2.5 text-foreground focus:border-primary focus:ring-primary"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30"
                    >
                        Create Exam
                    </button>
                </div>
            </form>
        </div>
    )
}
