package openerp.coderunnerservice.service;

import lombok.AllArgsConstructor;
import openerp.coderunnerservice.entity.TestCaseEntity;
import openerp.coderunnerservice.repo.TestCaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TestCaseService {

    private TestCaseRepo testCaseRepo;

    private static final String HASH = "TEST_CASE";

    @Cacheable(value = HASH, key = "#problemId + '_' + #isPublicTestCase")
    public List<TestCaseEntity> findListTestCaseWithCache(String problemId, boolean isPublicTestCase) {
        return findListTestCase(problemId, isPublicTestCase);
    }

    public List<TestCaseEntity> findListTestCase(String problemId, boolean isPublicTestCase) {
        List<TestCaseEntity> testCaseEntityList;
        if (isPublicTestCase) {
            testCaseEntityList = testCaseRepo.findAllByProblemId(problemId);
        } else {
            testCaseEntityList = testCaseRepo.findAllByProblemIdAndIsPublic(problemId, "N");
        }
        return testCaseEntityList;
    }

}
