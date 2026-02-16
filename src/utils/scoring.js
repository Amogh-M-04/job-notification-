export const calculateMatchScore = (job, prefs) => {
    if (!prefs) return { score: 0, breakdown: [] };

    let score = 0;
    const breakdown = [];

    // Rules
    // 1. Role Keywords in Title (+25)
    if (prefs.roleKeywords && prefs.roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const hasMatch = prefs.roleKeywords.some(kw => titleLower.includes(kw.toLowerCase().trim()));
        if (hasMatch) {
            score += 25;
            breakdown.push('Title Match (+25)');
        }
    }

    // 2. Role Keywords in Description (+15)
    if (prefs.roleKeywords && prefs.roleKeywords.length > 0) {
        const descLower = job.description.toLowerCase();
        const hasMatch = prefs.roleKeywords.some(kw => descLower.includes(kw.toLowerCase().trim()));
        if (hasMatch) {
            score += 15;
            breakdown.push('Description Match (+15)');
        }
    }

    // 3. Location Match (+15)
    if (prefs.preferredLocations && prefs.preferredLocations.length > 0) {
        // prefs.preferredLocations is array of strings
        const hasMatch = prefs.preferredLocations.some(loc => job.location.toLowerCase().includes(loc.toLowerCase().trim()));
        if (hasMatch) {
            score += 15;
            breakdown.push('Location Match (+15)');
        }
    }

    // 4. Mode Match (+10)
    if (prefs.preferredMode && prefs.preferredMode.length > 0) {
        const hasMatch = prefs.preferredMode.some(m => m.toLowerCase() === job.mode.toLowerCase());
        if (hasMatch) {
            score += 10;
            breakdown.push('Mode Match (+10)');
        }
    }

    // 5. Experience Match (+10)
    if (prefs.experienceLevel === job.experience) {
        score += 10;
        breakdown.push('Experience Match (+10)');
    }

    // 6. Skill Overlap (+15)
    if (prefs.skills && prefs.skills.length > 0 && job.skills) {
        const hasOverlap = job.skills.some(jobSkill =>
            prefs.skills.some(userSkill => jobSkill.toLowerCase().includes(userSkill.toLowerCase().trim()))
        );
        if (hasOverlap) {
            score += 15;
            breakdown.push('Skill Match (+15)');
        }
    }

    // 7. Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
        breakdown.push('Recently Posted (+5)');
    }

    // 8. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
        breakdown.push('LinkedIn Source (+5)');
    }

    return {
        score: Math.min(score, 100),
        breakdown
    };
};

export const parseSalary = (salaryRange) => {
    // extract first number found
    const match = salaryRange.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};
