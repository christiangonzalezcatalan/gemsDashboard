"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var projectMetrics = [
            { id: '1', name: 'Métrica 1' },
            { id: '2', name: 'Métrica 2' }
        ];
        return { projectMetrics: projectMetrics };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map