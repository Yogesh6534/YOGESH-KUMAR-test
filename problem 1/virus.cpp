#include <iostream>
#include <vector>
#include <string>

using namespace std;

int countMismatches(const string& s1, const string& s2) {
    // Count the number of mismatches between two strings
    int mismatches = 0;
    for (size_t i = 0; i < s1.length(); ++i) {
        if (s1[i] != s2[i]) {
            mismatches++;
        }
    }
    return mismatches;
}

void virusIndices(const vector<pair<string, string>>& testCases) {
    for (const auto& testCase : testCases) {
        const string& p = testCase.first;
        const string& v = testCase.second;
        vector<int> matches;
        size_t vLen = v.length();
        for (size_t i = 0; i <= p.length() - vLen; ++i) {
            string substring = p.substr(i, vLen);
            if (countMismatches(substring, v) <= 1) {
                matches.push_back(i);
            }
        }
        if (!matches.empty()) {
            for (size_t i = 0; i < matches.size(); ++i) {
                cout << matches[i];
                if (i != matches.size() - 1) {
                    cout << " ";
                }
            }
            cout << endl;
        } else {
            cout << "No Match!" << endl;
        }
    }
}

int main() {
    // Example test cases
    vector<pair<string, string>> testCases = {
        {"abbab", "ba"},
        {"hello", "world"},
        {"banana", "nan"}
    };

    virusIndices(testCases);

    return 0;
}
