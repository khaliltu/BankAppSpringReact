package tn.iit.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.iit.bank.entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	List<Account> findByClientCin(String cin);
}
