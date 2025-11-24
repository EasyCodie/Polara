const { breakdownTask } = require('../lib/scheduling/breakdown')

// Mock task
const mockTask = (duration) => ({
    id: 'task-1',
    user_id: 'user-1',
    estimated_duration: duration
})

function test(duration) {
    console.log(`\nTesting duration: ${duration} mins`)
    const sessions = breakdownTask(mockTask(duration))
    console.log('Sessions:', sessions.map(s => s.actual_duration))
    const total = sessions.reduce((sum, s) => sum + s.actual_duration, 0)
    console.log(`Total: ${total} mins (Expected: ${duration})`)
    if (total !== duration) console.error('FAIL: Duration mismatch')
}

// Run tests
// We need to handle the TS import in a JS script or use ts-node. 
// Since we don't have ts-node set up easily, let's just manually verify the logic 
// by converting the TS file to JS for this test or just trusting the logic for a moment 
// and building the UI. 
// Actually, let's make a temporary route to test it in the browser? 
// Or just use the "Auto-Schedule" button implementation to verify.

console.log("Skipping standalone script test due to TS compilation complexity. Will verify in UI.")
