function dedupe2(string, memo={}, idx=string.length-1, fixed="") {
    if (idx === -1) {
        return fixed;
    }
    else if (!memo[string[idx]]) {
        memo[string[idx]] = true;
        return dedupe2(string, memo, idx-1, string[idx]+fixed);
    }
    else {
        return dedupe2(string, memo, idx-1, fixed);
    }
}

console.log(dedupe2("Snaps! crackles! pops!"));

const used = process.memoryUsage().heapUsed / 1024 / 1024;

console.log(`The process uses approximately ${Math.round(used * 100) / 100} MB`);