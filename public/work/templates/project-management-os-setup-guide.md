# Setup Guide — Project Management OS for Notion

## 1. Import the CSV files
In Notion, create a new page named **Project Management OS**. Use **Import → CSV** and import each numbered CSV as its own database. Import in the order listed in README.md. Rename the resulting databases if Notion adds a suffix.

## 2. Review property types
After import, check each database's properties. Set date columns to **Date**, numeric columns such as Progress (%), Budget, Actual Cost, Estimated Hours, Actual Hours, Capacity Hours per Week, and Availability (%) to **Number**, and status-like columns to **Select**. Keep IDs as **Text**. Do not turn the ID fields into relations.

Recommended Select options:
- Project Status: Planning, In Progress, At Risk, On Hold, Completed, Cancelled
- Priority: Low, Medium, High, Urgent
- Task Status: Not Started, In Progress, Blocked, In Review, Done
- Task Type: Task, Milestone
- Record Type: Risk, Issue
- Risk / Issue Status: Open, Monitoring, In Progress, Resolved, Closed
- Severity / Likelihood: Low, Medium, High, Critical (where appropriate)
- Decision Status: Proposed, Approved, Rejected, Deferred
- Update Type: Weekly Update, Meeting, Issue Review, Decision Review, Retrospective

## 3. Create relations (manual Notion step)
Notion CSV import cannot reliably create relational links from text IDs. Create these relation properties after all databases are imported:
- In **Tasks and Milestones**, add `Project` → relation to **Projects**. Match each task's `Project ID` to the matching project and connect it. Keep Project ID as a traceable import key if useful.
- In **Team Workload**, add `Project` → Projects and `Task` → Tasks and Milestones. Connect rows using Project ID and Task ID.
- In **Risks and Issues**, add `Project` → Projects.
- In **Decisions Log**, add `Project` → Projects.
- In **Meetings and Updates**, add `Project` → Projects.
If a relation property is created after import, Notion may not auto-match the ID text. Manually select the correct related record; for larger datasets, use a repeatable ID-matching process and verify every row.

## 4. Suggested views
### Projects
- **All Projects** — table, sort by Target Date ascending.
- **Active** — filter Status is not Completed and is not Cancelled.
- **At Risk** — filter Status is At Risk.
- **Timeline** — timeline by Start Date and Target Date (configure the date range property as supported in your Notion plan/interface).

### Tasks and Milestones
- **All Tasks** — table, sort by Due Date ascending.
- **Board by Status** — board grouped by Status.
- **Calendar** — calendar by Due Date.
- **Blocked** — filter Status is Blocked.
- **Milestones** — filter Task Type is Milestone.

### Team Workload
- **By Team Member** — table grouped by Team Member.
- **This Week** — filter Week Starting is the current week.
- **High Load** — filter Workload Status is Overloaded.

### Risks and Issues
- **Open Register** — filter Status is not Resolved and is not Closed.
- **High Severity** — filter Severity is High or Critical.
- **Review Due** — sort Review Date ascending.

### Decisions Log
- **All Decisions** — table sorted by Decision Date descending.
- **Follow-ups** — filter Status is Approved and Follow-up Action is not empty; sort Due Date ascending.

### Meetings and Updates
- **Recent Updates** — sort Date descending.
- **By Project** — group by Project after relations are configured.
- **Action Items** — filter Action Items is not empty; sort Due Date ascending.

## 5. Build the dashboard page
On the main **Project Management OS** page, add headings:
- **Overview** — short purpose statement and links to the databases.
- **Active Projects** — create a linked view of Projects filtered to active statuses.
- **Tasks Due Soon** — linked view of Tasks and Milestones sorted by Due Date.
- **Blocked Work** — linked view filtered to Status = Blocked.
- **Risks Requiring Attention** — linked view filtered to high severity/open items.
- **Recent Decisions & Updates** — linked views of Decisions Log and Meetings and Updates.

Use `/linked` or the current Notion linked-view command to insert a linked database view. These views are configured inside Notion; they are not embedded by the CSV import itself.

## 6. Optional formulas
Add formulas only after the imported data and property types are verified. Formula syntax and available functions can change, so test formulas on a few rows first.
- **Task Overdue?** (if Status, Due Date are available): compare Due Date to today and exclude Done tasks.
- **Project Days Remaining**: compare Target Date with today.
- **Hours Variance**: Actual Hours minus Estimated Hours.
- **Budget Variance**: Budget minus Actual Cost.

Do not treat formulas as required for initial use. The system remains usable with the imported fields and manual status updates.

## 7. Import quality checklist
- [ ] All seven databases imported and renamed.
- [ ] Date fields recognized as dates.
- [ ] Numeric fields recognized as numbers.
- [ ] Status and priority fields converted to Select.
- [ ] Relations created and manually checked.
- [ ] Dashboard linked views created.
- [ ] Sample data replaced or removed.
- [ ] A test project, task, risk, and decision added to verify the workflow.

## Important limitations
This is a ready-to-import starter workspace pack, not a pre-built live Notion workspace. Import creates database tables and sample records. Relations, rollups, formulas, views, permissions, automations, and dashboard layout require configuration in Notion. No connection to external project management services is included.
