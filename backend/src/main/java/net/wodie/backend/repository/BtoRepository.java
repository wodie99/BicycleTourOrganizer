package net.wodie.backend.repository;

import net.wodie.backend.model.BtoItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BtoRepository extends MongoRepository<BtoItem, String> {

}


